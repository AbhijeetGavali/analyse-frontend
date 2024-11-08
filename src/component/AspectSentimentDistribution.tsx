import { Card, CardContent } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";

interface Stats {
  [key: string]: {
    negative: string;
    neutral: string;
    positive: string;
  };
}
export default function AspectSentimentDistribution(
  overall_aspect_sentiment_distribution: Stats,
) {
  const [data, setData] = useState<{
    positive: number[];
    negative: number[];
    neutral: number[];
  }>({ positive: [], negative: [], neutral: [] });

  useEffect(() => {
    const positive: number[] = [];
    const negative: number[] = [];
    const neutral: number[] = [];
    Object.keys(overall_aspect_sentiment_distribution).flatMap((aspect) => {
      positive.push(
        parseInt(overall_aspect_sentiment_distribution[aspect].positive),
      );
      negative.push(
        parseInt(overall_aspect_sentiment_distribution[aspect].negative),
      );
      neutral.push(
        parseInt(overall_aspect_sentiment_distribution[aspect].neutral),
      );
    });

    setData({
      positive: positive,
      negative: negative,
      neutral: neutral,
    });
  }, [overall_aspect_sentiment_distribution]);

  return (
    <Card style={{ width: "30%" }}>
      <CardContent>
        <h3>Overall Aspect Sentiment Distribution</h3>
        <BarChart
          layout="horizontal"
          yAxis={[
            {
              scaleType: "band",
              data: Object.keys(overall_aspect_sentiment_distribution),
            },
          ]}
          xAxis={[{ label: "Percentage Distribution (%)" }]}
          series={[
            {
              data: data.positive,
              label: "Positive",
              id: "positive",
              stack: "total",
              color: "#4CAF50",
              valueFormatter: (val) => `${val} %`,
            },
            {
              data: data.negative,
              label: "Negative",
              id: "negative",
              stack: "total",
              color: "#F44336",
              valueFormatter: (val) => `${val} %`,
            },
            {
              data: data.neutral,
              label: "Neutral",
              id: "neutral",
              stack: "total",
              color: "#FFC107",
              valueFormatter: (val) => `${val} %`,
            },
          ]}
          width={450}
          height={200}
          margin={{ left: 100, right: 50 }}
        />
      </CardContent>
    </Card>
  );
}
