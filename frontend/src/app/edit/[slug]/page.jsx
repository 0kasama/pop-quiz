import EditForm from "@/components/EditForm";

export default function EditPage({ params }) {
  return <EditForm slug={params.slug} />;
}
