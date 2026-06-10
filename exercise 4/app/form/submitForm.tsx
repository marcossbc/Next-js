"use server";

export async function submitForm(
  prevState: any,
  formData: FormData
) {
  const email =
    formData.get("email")?.toString() || "";

  const password =
    formData.get("password")?.toString() || "";

  const firstName =
    formData.get("firstName")?.toString() || "";

  const lastName =
    formData.get("lastName")?.toString() || "";


  console.log("Email:", email);


  if (password.length < 6) {
    return {
      success: false,
      message: "",
      error: "Password must be at least 6 characters",
    };
  }

  
  return {
    success: true,
    message: `Hello, ${firstName} ${lastName}! Thanks for submitting!`,
    error: "",
  };
}