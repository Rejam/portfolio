import client from "lib/client";

const useFetch = () => {
  try {
    const res = client.fetch(
      `//groq
    *[_type == 'post']
      { ... }
    `
    );
    return { data: res };
  } catch (error) {
    return { data: null };
  }
};

export default function Home() {
  const { data } = useFetch();

  console.log({ data });
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
