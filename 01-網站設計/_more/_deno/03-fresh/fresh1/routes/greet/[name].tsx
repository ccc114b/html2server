import { PageProps } from "$fresh/server.ts";

/*
export default function Greet(props: PageProps) {
  return <div>Hello {props.params.name}</div>;
}
*/

export default function GreetPage(props: PageProps) {
  const { name } = props.params;
  return (
    <main>
      <p>Greetings to you, {name}!</p>
    </main>
  );
}