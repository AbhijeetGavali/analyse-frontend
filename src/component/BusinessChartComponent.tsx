import { useEffect, useState } from "react";
import OverallSentimentDistribution from "./OverallSentimentDistribution";
import AspectSentimentDistribution from "./AspectSentimentDistribution";
import AspectsToFocus from "./AspectsToFocus";

interface State {
  overall_sentiment_distribution: {
    negative: string;
    neutral: string;
    positive: string;
  };
  overall_aspect_sentiment_distribution: {
    [key: string]: {
      negative: string;
      neutral: string;
      positive: string;
    };
  };
  business_recommendations: {
    customer_experience_areas_to_focus_on: string[];
    suggested_priority_actions: string[];
  };
}

export default function BusinessChartComponent() {
  const [stats, setStats] = useState<State>({
    overall_sentiment_distribution: {
      negative: "25.0",
      neutral: "18.75",
      positive: "56.25",
    },
    overall_aspect_sentiment_distribution: {
      name: {
        negative: "25.0",
        neutral: "18.75",
        positive: "56.25",
      },
    },
    business_recommendations: {
      customer_experience_areas_to_focus_on: [],
      suggested_priority_actions: [],
    },
  });

  const getAllStats = async () => {
    const response = await fetch(`http://localhost:8080/api/v1/reviews/stats`);
    const data = await response.json();
    console.log(data.data);
    setStats(data.data);
  };

  useEffect(() => {
    getAllStats();
  }, []);

  return (
    <div
      style={{ display: "flex", gap: "20px", justifyContent: "space-evenly" }}
    >
      <OverallSentimentDistribution {...stats.overall_sentiment_distribution} />
      <AspectSentimentDistribution
        {...stats.overall_aspect_sentiment_distribution}
      />
      <AspectsToFocus {...stats.business_recommendations} />
    </div>
  );
}
