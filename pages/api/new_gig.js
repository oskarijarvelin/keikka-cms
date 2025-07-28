
export default function handler(req, res) {
    const body = req.body;

    if (!body.asiakasnumero) {
        return res.status(400).json({ data: "Missing Client ID" });
    }

    if (!body.title) {
        return res.status(400).json({ data: "Missing gig title" });
    }

    var description = "";

    if (body.venue) {
        description += "Venue: " + body.venue;

        if (body.description) {
            description += "\n\n";
        }
    }

    if (body.description) {
        description += body.description;
    }

    if (body.keikanstatus == 1) {
        description += "\n\n Ehdot hyväksytty.";
    }

    fetch(
        `https://api.clickup.com/api/v2/list/${body.asiakasnumero}/task?custom_task_ids=true&team_id=${process.env.KEIKAT_TEAM_ID}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${process.env.CLICKUP_API_KEY}`
            },
            body: JSON.stringify({
                "name": body.title,
                "description": description,
                "due_date": body.duedate ? body.duedate : null,
                "due_date_time": true,
                "start_date": body.startdate ? body.startdate : null,
                "start_date_time": true,
                "notify_all": true,
                "parent": null,
                "links_to": null,
            })
        }
    )
        .then((resp) => resp.json())
        .then((resp) => {
            if (resp?.name === body.title) {
                //send_push(resp.secret_key);
                res.status(201).json({ success: true });
            } else {
                res
                    .status(400)
                    .json({ data: "Error. Task not created." });
            }
        });
}
