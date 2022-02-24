import Container from "../components/Container";
import Banner from "../components/Banner";
import { costsActions } from "../store/costs-slice";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function Home1({ data }) {
  const router = useRouter();
  const filteredCosts = useSelector((state) => state.costs.filteredCosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(costsActions.replaceCosts(data));
  }, [dispatch, data]);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const costs = filteredCosts.map((c) => Number(c.costAmount));
    if (costs.length > 0) {
      const sum = costs.reduce((a, b) => a + b);
      setTotal(sum);
    } else {
      setTotal(0);
    }
  }, [filteredCosts]);

  return (
    <div className="w-full h-full overflow-auto bg-tertiary pt-24">
      <Container>
        <Banner total={total} />
        {(!filteredCosts || filteredCosts.length === 0) && (
          <div className="w-full p-4 flex items-center justify-center bg-red-700/20 rounded-xl my-5 text-red-900">
            No Costs
          </div>
        )}
        {filteredCosts.length > 0 &&
          filteredCosts.map((cost) => (
            <div
              onClick={() => {
                router.push(`/${cost._id}`);
              }}
              className="cursor-pointer w-full bg-black/10 my-3 rounded-xl p-3 flex flex-wrap items-center content-center justify-between gap-5 hover:bg-red-300"
              key={cost._id}
            >
              <h1 className="p-4 bg-primary text-light font-bold text-xl rounded-xl">
                ${new Intl.NumberFormat().format(cost.costAmount)}
              </h1>
              <h1 className=" text-primary capitalize grow font-bold text-xl rounded-xl">
                {cost.title}
              </h1>
              <h1>{new Date(cost.date).toLocaleDateString()}</h1>
            </div>
          ))}
      </Container>
    </div>
  );
}

export default Home1;
