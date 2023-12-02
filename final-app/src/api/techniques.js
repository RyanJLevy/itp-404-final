const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function fetchAllTechniques() {
  return fetch(`${baseUrl}/techniques`).then((response) => response.json());
}

export async function fetchTechniqueBySlug(techniqueSlug) {
  return fetch(`${baseUrl}/techniques?_embed=comments`)
    .then((response) => response.json())
    .then((data) =>
      data.filter((technique) => technique.slug === techniqueSlug)
    );
}
