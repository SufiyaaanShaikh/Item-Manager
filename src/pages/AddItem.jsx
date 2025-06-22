import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiUpload, FiX } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { createItem } from "../utils/api";

const AddItem = () => {
  const [additionalImages, setAdditionalImages] = useState([]);
  const [coverImage, setCoverImage] = useState(null);

  const initialValues = {
    name: "",
    description: "",
    price: "",
    type: "",
    coverImage: null, // Add coverImage to initial values
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Item name is required")
      .max(50, "Item name must be 50 characters or less")
      .matches(
        /^[a-zA-Z0-9\s]+$/,
        "Item name can only contain letters, numbers, and spaces"
      )
      .min(3, "Item name must be at least 3 characters"),
    description: Yup.string()
      .required("Description is required")
      .max(200, "Description must be 200 characters or less")
      .min(10, "Description must be at least 10 characters"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
    type: Yup.string()
      .required("Type is required")
      .oneOf(["shirt", "pant", "shoes", "sports gear"], "Invalid item type"),
    coverImage: Yup.mixed()
      .required("Cover image is required")
      .test("fileType", "Only image files are allowed", (value) => {
        if (!value) return false;
        return value && value.type.match(/image.*/);
      })
      .test("fileSize", "File size must be 5MB or less", (value) => {
        if (!value) return false;
        return value.size <= 5 * 1024 * 1024; // 5MB
      }),
  });

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setFieldError }
  ) => {
    try {
      // Manually validate cover image since Formik doesn't handle file inputs well
      if (!coverImage) {
        setFieldError("coverImage", "Cover image is required");
        setSubmitting(false);
        return;
      }

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("type", values.type);
      formData.append("files", coverImage);

      additionalImages.forEach((image) => {
        formData.append("files", image);
      });

      await createItem(formData);
      toast.success("Item successfully added");
      resetForm();
      setCoverImage(null);
      setAdditionalImages([]);
    } catch (error) {
      toast.error(error.message || "Failed to add item");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCoverImageChange = (e, setFieldValue, setFieldError) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      setFieldValue("coverImage", file);
      setFieldError("coverImage", undefined);
    }
  };

  const handleAdditionalImagesChange = (e) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      const totalImages = additionalImages.length + newImages.length;

      if (totalImages > 4) {
        toast.error("You can upload maximum 4 additional images");
        return;
      }

      setAdditionalImages([...additionalImages, ...newImages]);
    }
  };

  const removeAdditionalImage = (index) => {
    const newImages = [...additionalImages];
    newImages.splice(index, 1);
    setAdditionalImages(newImages);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-sm max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-6">Add New Item</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, setFieldError, errors, touched }) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
              {/* Left Column */}
              <div className="space-y-1.5">
                <div className="h-20">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Item Name *
                  </label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="h-20">
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Item Type *
                  </label>
                  <Field
                    as="select"
                    name="type"
                    id="type"
                    className="mt-1 pr-12 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  >
                    <option value="">Select a type</option>
                    <option value="shirt">Shirt</option>
                    <option value="pant">Pant</option>
                    <option value="shoes">Shoes</option>
                    <option value="sports gear">Sports Gear</option>
                  </Field>
                  <ErrorMessage
                    name="type"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="h-20">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price *
                  </label>
                  <div className="mt-1 relative rounded-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <Field
                      type="number"
                      name="price"
                      id="price"
                      step="0.01"
                      min="0"
                      className="block w-full pl-7 pr-7 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="h-[10em]">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description *
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    id="description"
                    rows={5}
                    className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2 border"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="h-20 mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Cover Image *
                  </label>
                  <div className="mt-1 flex flex-col justify-center gap-1.5">
                    <label
                      htmlFor="cover-image"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                    >
                      <FiUpload className="mr-2" />
                      {coverImage ? "Change Cover Image" : "Upload Cover Image"}
                    </label>
                    <input
                      id="cover-image"
                      name="coverImage"
                      type="file"
                      className="sr-only"
                      onChange={(e) =>
                        handleCoverImageChange(e, setFieldValue, setFieldError)
                      }
                      accept="image/*"
                    />
                    {coverImage && (
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500">
                          {coverImage.name}
                        </span>
                      </div>
                    )}
                  </div>
                  <ErrorMessage
                    name="coverImage"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Additional Images - Full width */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Additional Images (Max 4)
              </label>
              <div className="mt-2">
                <label
                  htmlFor="additional-images"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <FiUpload className="mr-2" />
                  Upload Additional Images
                </label>
                <input
                  id="additional-images"
                  name="additionalImages"
                  type="file"
                  className="sr-only"
                  onChange={handleAdditionalImagesChange}
                  accept="image/*"
                  multiple
                />
              </div>

              {additionalImages.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-500 mb-2">
                    {additionalImages.length} of 4 images selected
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {additionalImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Additional ${index + 1}`}
                          className="h-24 w-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeAdditionalImage(index)}
                          className="absolute cursor-pointer top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FiX size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex cursor-pointer justify-center py-2 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isSubmitting ? "Adding Item..." : "Add Item"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default AddItem;
