import Image from 'next/image';

type Props = {
  title: string;
};

const Component = ({ title }: Props) => {
  console.log(title);
  return (
    <>
      <h2>Component</h2>
    </>
  );
};

export default function Home() {
  return (
    <div>
      <h2>TESTE 2</h2>

      <Component title={1} />
    </div>
  );
}
