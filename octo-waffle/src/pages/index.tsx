import Head from "next/head";
import useSWR from "swr";

// components
import Card from "../components/card.js";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const query =
    "Elliði Vignisson, bæjarstjóri Ölfuss, og Karl Wernerson, stofnandi Kamba, handssala byggingarstaðinn og fyrirhugað útlit verskmiðjunnar. ";
  const { data, error, isLoading } = useSWR(
    `/api/search?query=${query}`,
    fetcher
  );
  console.log(data);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const cards = data.map(({ text }, i: int) => <Card title={text} key={i} />);

  return (
    <>
      <Head>
        <title>ISL semantic search</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Semantic search in Icelandic</h1>

        <input type="text" />
        <button type="submit"></button>
        {data && <div className="cards">{cards}</div>}
      </main>
    </>
  );
}

// export default WordPage;
