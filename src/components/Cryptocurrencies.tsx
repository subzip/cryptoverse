import React, { FC, useState, useEffect } from "react";
import { Card, Col, Input, Row } from "antd";
import { Link } from "react-router-dom";
import { millify } from "millify";
import { getTokens } from "../services/queries";
import { useQuery } from "react-query";
import Loader from "./Loader";

interface CryptoProps {
  limit: number;
  simplified: boolean;
}

interface ICoin {
  name: string;
}

const Cryptocurrencies: FC<CryptoProps> = ({ limit, simplified }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: tokens, isLoading } = useQuery("tokens", () =>
    getTokens(limit)
  );
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const filteredData = tokens?.data?.coins.filter((coin: ICoin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [tokens, searchTerm]);

  if (isLoading) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className='search-crypto'>
          <Input
            placeholder='Search Cryptocurrency'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos?.map((el: any) => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={el.uuid}>
            <Link to={`/crypto/${el.uuid}`}>
              <Card
                title={`${el.rank}. ${el.name}`}
                extra={<img className='crypto-image' src={el.iconUrl} alt='' />}
                hoverable
              >
                <p>Price: {millify(el.price)}</p>
                <p>Market Cap: {millify(el.marketCap)}</p>
                <p>Dauly Change: {millify(el.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
