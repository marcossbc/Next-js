
"use-server";


type FormDataAction = {
    message: string;
    error: string;
}
export async function greet(FormData: FormData) : Promise<FormDataAction> {
    const name = FormData.get("name")?.toString() || "";

    if(!name || name.trim() === "") {
        return { message: "", error: "Name is required" };
    }

    console.log("Form submitted with name:", name);

    return { message: "Form submitted successfully", error: "" };
}