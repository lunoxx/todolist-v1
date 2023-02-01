
const express = require("express");
const bodyParser = require("body-parser");
const dateTime = require("datetime-js");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(express.static("public"));

const d = dateTime(new Date(), '%d %M:s %Y, %H:%i');
var list_items = [
    {
        id: 1,
        description: "Excepteur non ex culpa veniam duis cupidatat exercitation fugiat deserunt ad ullamco exercitation adipisicing offici.",
        date: d,
        finished: false
    },
    {
        id: 2,
        description: "Officia amet dolor et sit qui deserunt dolore velit deserunt.",
        date: d,
        finished: true
    },
    {
        id: 3,
        description: "Proident adipisicing labore occaecat eu occaecat eiusmod officia velit esse culpa deserunt sint.",
        date: d,
        finished: false
    }
];

// used for errors / messages 
let Messages = {};

app.get("/", function(req, res) {
    res.render("index.ejs", {list_items, Messages} );
});

// add new item on the list
app.post("/", (req, res) => {
    var item = req.body.newItemName;

    if(item.length > 3) {
        const dateObject = new Date();

        const element = {
            id: list_items.length + 1,
            description: item,
            date: dateTime(dateObject, '%d %M:s %Y, %H:%i'),
            finished: false
        };

        list_items.push(element);
        res.redirect("/");
    }
    else {
        Messages = {
            type:"error",
            description:"Please use more than 3 characters for your new task"
        };

        res.render("index.ejs", {list_items, Messages} );

        delete Messages.type;
        console.log(Messages);
    }
});

// mark checked
app.post("/markFinish", (req, res) => {

    var id = req.query.id; // checked item id
    const checked = Boolean(req.body.markFinishCheck); //

    if(id >= 0 && id < list_items.length) {
        list_items[id].finished = checked;
    }

    res.redirect("/");
});

// remove items
app.post("/delete", (req, res) => {
    var id = req.query.id; // get clicked item from the list

    delete list_items[id];

    res.redirect("/");
});

app.listen(3000, function() {
    console.log("Server is running on port 3000.");
}); 

