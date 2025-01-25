import { fetchArticleById, fetchSourcesByArticleId } from "@/lib/actions";
import Form from "@/ui/admin/edit-form";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const article = await fetchArticleById(id);
  const sources = await fetchSourcesByArticleId(id);

  if (!article || !sources) {
    return;
  }

  return <Form props={{ article, sources }} />;
}
