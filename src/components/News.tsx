import React, { FC, useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { getNews, getTokens } from "../services/queries";
import { useQuery } from "react-query";
import Loader from "./Loader";
import HTMLReactParser from "html-react-parser";
const { Text, Title } = Typography;
const { Option } = Select;

interface NewsProps {
  limit: number;
  simplified: boolean;
}

const News: FC<NewsProps> = ({ limit, simplified }) => {
  const { data, isLoading } = useQuery("news", () =>
    getNews(simplified ? 6 : limit)
  );
  const { data: tokens } = useQuery("tokens", () => getTokens(100));

  console.log(tokens);

  const [newsCategory, setNewsCategory] = useState<string>("Cryptocurrency");

  const cryptoNews = data?.data[0].screen_data.news;
  let newsCrypto = cryptoNews;
  if (simplified) {
    newsCrypto = cryptoNews?.slice(0, 6);
  }
  console.log(cryptoNews?.slice(0, 6));

  const demoImage = "https://i.ibb.co/Z11pcGG/cryptocurrency.png";

  if (isLoading) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select<string, { value: string; children: string }>
            showSearch
            className='select-news'
            placeholder='Select a Crypto'
            optionFilterProp='children'
            onChange={(value: string) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value='Cryptocurrency'>Cryptocurrency</Option>
            {tokens?.data?.coins.map((coin: any) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {newsCrypto
        ?.filter((news: any) => {
          if (newsCategory === "Cryptocurrency") {
            return true;
          }
          return news.HEADLINE.includes(newsCategory);
        })
        .map((news: any) => {
          return (
            <Col xs={24} sm={12} lg={8} key={news.news_ID}>
              <Card hoverable className='news-card'>
                <a href={news.news_link} target='_blank' rel='noreferrer'>
                  <div className='news-image-container'>
                    <Title className='news-title' level={4}>
                      {news.HEADLINE}
                    </Title>
                    <img
                      style={{ maxWidth: "200px", maxHeight: "100px" }}
                      src={news?.related_image || demoImage}
                      alt='news'
                    />
                  </div>
                  <p>
                    {news.BODY.length > 100
                      ? `${news.BODY.substring(0, 201)}...`
                      : HTMLReactParser(news.BODY)}
                  </p>
                  <div className='provider-container'>
                    <div>
                      <Avatar src={news.related_image} />
                      <Text className='provider-name'>
                        {news.news_provider_name}
                      </Text>
                    </div>
                    <Text>
                      {moment(news.last_updated).startOf("second").fromNow()}
                    </Text>
                  </div>
                </a>
              </Card>
            </Col>
          );
        })}
    </Row>
  );
};

export default News;
