import React from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";
import Loader from "./Loader";
import { useQuery } from "react-query";
import { getExchanges } from "../services/queries";
import market from "../images/market.png";

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data: exchanges, isLoading } = useQuery("exchanges", () =>
    getExchanges()
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <Row>
        <Col span={5}>Exchange</Col>
        <Col span={4}>Markets</Col>
        <Col span={4}>Rank</Col>
        <Col span={4}>Currencies</Col>
        <Col span={4}>Total 24h Volume</Col>
      </Row>
      <br />
      <Row>
        {exchanges
          ?.slice(0, 120)
          .filter((el: any) => (el.reported_rank !== null ? true : false))
          .sort((a: any, b: any) =>
            a.reported_rank < b.reported_rank ? -1 : 1
          )
          .map((exchange: any, i: number) => (
            <Col span={24} key={exchange.id}>
              <Collapse ghost>
                <Panel
                  key={i + 1}
                  showArrow={false}
                  header={
                    <Row>
                      <Col span={5}>
                        <Text strong={true}>{i + 1}. </Text>
                        <Avatar src={market} />
                        <Text>{exchange.name}</Text>
                      </Col>
                      <Col span={4}>{exchange.markets}</Col>
                      <Col span={4}>
                        {exchange.reported_rank === null
                          ? 0
                          : exchange.reported_rank}
                      </Col>
                      <Col span={4}>{exchange.currencies}</Col>
                      <Col span={4}>
                        {millify(exchange.quotes.USD.reported_volume_24h)}
                      </Col>
                    </Row>
                  }
                >
                  {HTMLReactParser(exchange.description)}
                </Panel>
              </Collapse>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default Exchanges;
