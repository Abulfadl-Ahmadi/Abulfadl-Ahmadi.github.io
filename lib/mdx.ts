import fs from "fs";
import path from "path";
import matter from "gray-matter";

const notesDirectory = path.join(process.cwd(), "content/notes");

export interface NoteItem {
  slug: string;
  title: string;
  category: string;
  date: string;
  description: string;
  content: string;
}

export function getAllNotes(): NoteItem[] {
  if (!fs.existsSync(notesDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(notesDirectory);
  const allNotesData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(notesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        category: data.category || "General",
        date: data.date || "",
        description: data.description || "",
        content,
      };
    });

  // Sort notes by date descending
  return allNotesData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getNoteBySlug(slug: string): NoteItem | null {
  try {
    const fullPathMDX = path.join(notesDirectory, `${slug}.mdx`);
    const fullPathMD = path.join(notesDirectory, `${slug}.md`);

    let fullPath = "";
    if (fs.existsSync(fullPathMDX)) {
      fullPath = fullPathMDX;
    } else if (fs.existsSync(fullPathMD)) {
      fullPath = fullPathMD;
    } else {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      category: data.category || "General",
      date: data.date || "",
      description: data.description || "",
      content,
    };
  } catch (e) {
    return null;
  }
}
