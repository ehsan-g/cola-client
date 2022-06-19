import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  AvatarGroup,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { Join } from "../../redux/types/types";
import eventsSlice, {
  fetchEvents,
  joinEvent,
  leaveEvent,
} from "../../redux/features/buildings/eventsSlice";

export default function EventAccordion({
  event,
}: {
  event: any;
  roomId: number;
}) {
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState<string | false>(false);

  const { profile } = useAppSelector((state) => state.user);

  const { status: statusEvent } = useAppSelector((state) => state.events);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <AccordionActions disableSpacing sx={{ maxWidth: "100% !important" }}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{ maxWidth: "100% !important" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{
            margin: "auto",
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                sx={{
                  flexShrink: 0,
                  textAlign: "center",
                  color: "text.primary",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  height: "1.2em",
                  whiteSpace: "nowrap",
                }}
              >
                {event.title}sgrgsgsgsths stjhsr
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                sx={{
                  textAlign: "center",
                  color: "text.primary",
                  margin: "auto",
                }}
              >
                Event: {event && event.id}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <FormControlLabel
                aria-label="Acknowledge"
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
                control={
                  <LoadingButton
                    loading={statusEvent === "loading"}
                    variant="outlined"
                    size="small"
                    sx={{ fontSize: "10px" }}
                    onClick={() =>
                      event.attendees.find(
                        (userId: number) => userId === profile?.id
                      )
                        ? dispatch(leaveEvent(event.id))
                        : dispatch(joinEvent(event.id))
                    }
                  >
                    {/* {event.id} */}
                    {event.attendees.find(
                      (userId: number) => userId === profile?.id
                    )
                      ? "Registered"
                      : "Join"}
                  </LoadingButton>
                }
                label=""
              />
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            minWidth: "100%",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              flexShrink: 0,
              textAlign: "center",
              color: "text.primary",
            }}
          >
            {event.title}sgrgsgsgsths stjhsr
          </Typography>
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
    </AccordionActions>
  );
}
