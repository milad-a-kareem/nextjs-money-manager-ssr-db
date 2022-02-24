import Detail from "../components/Detail";

function CostDetail({ cost }) {
  return <Detail detail={cost} />;
}

export default CostDetail;

export async function getServerSideProps(context) {
  const params = context.params;
  const data = await fetch(`https://nextjs-money-manager-ssr-db.vercel.app/api/${params.costId}`)
    .then(async (res) => {
      const data = await res.json();
      return data;
    })
    .catch((e) => {
      console.log(e);
    });

  return { props: { cost: data } };
}
