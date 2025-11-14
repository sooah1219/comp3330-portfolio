// post/api/projects/new

export async function POST(req) {
  try {
    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const img = formData.get("img");
    const link = formData.get("link");

    let keywordsRaw = formData.get("keywords");
    let keywords = [];

    try {
      keywords = keywordsRaw ? JSON.parse(keywordsRaw) : [];
    } catch (err) {
      console.warn("Failed to parse keywords JSON.");
      keywords = [];
    }

    if (!title || !description || !img || !link) {
      return Response.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("New Project Received:");
    console.log({
      project: { title, description, img, link, keywords },
    });

    return Response.json(
      {
        ok: true,
        message: "Project created successfully",
        project: { title, description, img, link, keywords },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/projects/new error:", err);
    return Response.json(
      { ok: false, error: "Invalid payload" },
      { status: 400 }
    );
  }
}
