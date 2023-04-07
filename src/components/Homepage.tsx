import { Col, Row, Statistic, Typography } from "antd";
import { Link } from "react-router-dom";
import millify from "millify";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
import { useQuery } from "react-query";
import { getTokens } from "../services/queries";
import Loader from "./Loader";

const Homepage = () => {
  const { data: coins, isLoading } = useQuery("tokens", () => getTokens(10));

  const globalStats = coins?.data?.stats;

  if (isLoading) return <Loader />;
  return (
    <>
      <Typography.Title level={2} className='heading'>
        Global Crypto Stats
      </Typography.Title>
      <Row>
        <Col span={12}>
          <Statistic
            title='Total Cryptocurrencies'
            value={millify(globalStats?.total)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title='Total Exchanges'
            value={millify(globalStats?.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title='Total Market Cap'
            value={millify(globalStats?.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title='Total 24h Volume'
            value={millify(globalStats?.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title='Total Markets'
            value={millify(globalStats?.totalMarkets)}
          />
        </Col>
      </Row>
      <div className='home-heading-container'>
        <Typography.Title level={2} className='home-title'>
          Top 10 Cryptocurrencies in the world
        </Typography.Title>
        <Typography.Title level={3} className='show-more'>
          <Link to='/cryptocurrencies'>Show more</Link>
        </Typography.Title>
      </div>
      <Cryptocurrencies limit={10} simplified={true} />
      <div className='home-heading-container'>
        <Typography.Title level={2} className='home-title'>
          Latest Crypto News
        </Typography.Title>
        <Typography.Title level={3} className='show-more'>
          <Link to='/news'>Show more</Link>
        </Typography.Title>
      </div>
      <News limit={6} simplified={true} />
    </>
  );
};

export default Homepage;
