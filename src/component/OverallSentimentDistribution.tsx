import { Card, CardContent } from "@mui/material";
import { PieChart } from "@mui/x-charts";

interface Stats {
  negative: string;
  neutral: string;
  positive: string;
}
export default function OverallSentimentDistribution({
  negative,
  positive,
  neutral,
}: Stats) {
  return (
    <Card style={{ width: "30%" }}>
      <CardContent>
        <h3>Overall Sentiment Distribution</h3>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: parseInt(positive), label: "Positive" },
                { id: 1, value: parseInt(negative), label: "Negative" },
                { id: 2, value: parseInt(neutral), label: "Neutral" },
              ],
            },
          ]}
          width={350}
          height={200}
        />
      </CardContent>
    </Card>
  );
}
