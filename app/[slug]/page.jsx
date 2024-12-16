import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { notFound } from "next/navigation";

async function getPage(slug) {
  try {
    // Busca a página usando o filtro adequado
    const res = await directus.request(
      readItems("pages", { filter: { slug: { _eq: slug } } })
    );


    return res[0]; // Retorna a primeira página encontrada
  } catch (error) {
    console.error("Erro ao buscar página:", error);
    notFound(); // Renderiza a página 404
  }
}

export default async function DynamicPage({ params }) {
  if (!params || !params.slug) {
    notFound(); // Redireciona para 404 se o slug não estiver presente
  }

  const { slug } = params;

  // Busca os dados da página
  const page = await getPage(slug);
  console.log(page)
  if (!page) {
    notFound(); // Redireciona para 404 se a página não for encontrada
  }

  return (
    <div>
      <h1>{page.title}</h1>
      {/* Garante que o HTML está no formato adequado */}
      <div dangerouslySetInnerHTML={{ __html: page.content || "" }}></div>
      
    </div>
  );
}
