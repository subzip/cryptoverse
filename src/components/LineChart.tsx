import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import { FC } from "react";
import type { ChartData, ChartOptions } from "chart.js";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const { Title } = Typography;

interface LineChartProps {
  coinHistory: any;
  currentPrice: string;
  coinName: any;
}

const LineChart: FC<LineChartProps> = ({
  coinHistory,
  currentPrice,
  coinName,
}) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.push(coinHistory.data.history[i].price);
    coinTimestamp.push(
      new Date(
        coinHistory.data.history[i].timestamp * 1000
      ).toLocaleDateString()
    );
  }

  console.log(coinTimestamp);

  const data: ChartData<"line"> = {
    labels: coinTimestamp.reverse(),
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <>
      <Row className='chart-header'>
        <Title level={2} className='chart-title'>
          {coinName} Price Chart
        </Title>
        <Col className='price-container'>
          <Title level={5} className='price-change'>
            {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className='current-price'>
            Current {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
