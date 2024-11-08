import { Card, CardContent, Chip } from "@mui/material";

interface BusinessRecommendations {
  customer_experience_areas_to_focus_on: string[];
  suggested_priority_actions: string[];
}
export default function AspectsToFocus(
  business_recommendations: BusinessRecommendations,
) {
  return (
    <Card style={{ width: "30%" }}>
      <CardContent>
        <h3>Suggested areas to focus:</h3>
        <div>
          {business_recommendations.customer_experience_areas_to_focus_on.map(
            (rec, key) => (
              <Chip
                key={rec + key}
                label={rec}
                style={{
                  margin: "2px",
                  padding: "2px 5px",
                }}
              />
            ),
          )}
        </div>
        <h3>Suggested actions to take:</h3>
        <div>
          {business_recommendations.suggested_priority_actions.map(
            (rec, key) => (
              <Chip
                key={rec + key}
                label={rec}
                style={{
                  margin: "2px",
                  padding: "2px 5px",
                }}
              />
            ),
          )}
        </div>
      </CardContent>
    </Card>
  );
}
