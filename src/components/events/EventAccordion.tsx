import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  AvatarGroup,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

export default function EventAccorion({ event }: { event: any }) {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  console.log();

  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography
          variant="subtitle1"
          sx={{
            width: "33%",
            flexShrink: 0,
            textAlign: "center",
            color: "text.primary",
          }}
        >
          Event: {event && event.id}
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            color: "text.primary",
            margin: "auto",
          }}
        >
          {event.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          minWidth: "100%",
        }}
      >
        <Typography
          sx={{
            color: "text.secondary",
          }}
        >
          start:
          {event &&
            new Date(event.start).toLocaleDateString("en-CA", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
          }}
        >
          end:
          {event &&
            new Date(event.end).toLocaleDateString("en-CA", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            paddingTop: 2,
          }}
        >
          description: {event && event.description}
        </Typography>
        <AvatarGroup
          sx={{
            "& .MuiAvatar-root": {
              "&.MuiAvatar-colorDefault": {
                width: 34,
                height: 34,
                fontSize: "12px",
              },
            },
          }}
          max={5}
          total={24}
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </AvatarGroup>
      </AccordionDetails>
    </Accordion>
  );
}
