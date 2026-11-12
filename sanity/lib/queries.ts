import { defineQuery } from 'groq'

export const CATALOG_QUERY = defineQuery(`
  *[_type == "course"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    level,
    price,
    popular,
    studentCount,
    coverImage,
    instructor->{ name, photo },
    category->{ title, "slug": slug.current },
    "moduleCount": count(modules),
    "lessonCount": count(modules[].lessons[])
  }
`)

export const COURSE_QUERY = defineQuery(`
  *[_type == "course" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    summary,
    coverImage,
    level,
    price,
    popular,
    studentCount,
    learningOutcomes,
    instructor->{ _id, name, "slug": slug.current, photo, expertise, bio },
    category->{ title, "slug": slug.current },
    modules[] {
      _key,
      title,
      summary,
      lessons[]->{ _id, title, "slug": slug.current, duration, freePreview, poster, studentCount }
    }
  }
`)

export const LESSON_QUERY = defineQuery(`
  *[_type == "lesson" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    videoUrl,
    poster,
    duration,
    freePreview,
    studentCount,
    notes,
    keyPoints,
    proTip,
    resources,
    "course": *[_type == "course" && references(^._id)][0] {
      _id,
      title,
      "slug": slug.current,
      instructor->{ name, "slug": slug.current, photo },
      modules[] {
        _key,
        title,
        "lessons": lessons[]->{ _id, "slug": slug.current, title, duration, freePreview }
      }
    }
  }
`)

export const INSTRUCTOR_QUERY = defineQuery(`
  *[_type == "instructor" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    photo,
    expertise,
    bio
  }
`)

export const INSTRUCTOR_COURSES_QUERY = defineQuery(`
  *[_type == "course" && instructor->slug.current == $slug] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    level,
    price,
    popular,
    studentCount,
    coverImage,
    instructor->{ name, photo },
    category->{ title, "slug": slug.current },
    "moduleCount": count(modules),
    "lessonCount": count(modules[].lessons[])
  }
`)
