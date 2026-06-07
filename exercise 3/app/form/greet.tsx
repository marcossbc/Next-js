
"use-server";
export async function greet(FormData: FormData){
    const name = FormData.get("name")?.toString() || "";

    console.log("Form submitted with name:", name);

    return new Response("Form submitted successfully", { status: 200 });
}