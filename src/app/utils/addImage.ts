const addImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0] as File;
  const data = new FormData();
  data.set("file", file);
  const response = await fetch("/api/pinata", {
    method: "POST",
    body: data,
  });
  const result = await response.json();
  return result.url
};

export default addImage