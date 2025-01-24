import { fetchArticleById, fetchSourcesByArticleId } from "@/app/lib/actions";
import Form from "@/app/ui/admin/edit-form";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const article = await fetchArticleById(id);
  const sources = await fetchSourcesByArticleId(id);

  if (!article || !sources) {
    return;
  }

  return <Form props={{article, sources}} />;
}
