
# AI Food Recomendation System | CPSC 481 Project

A Food Recomendation System created using Kagle Database with JSX (react) for the front end



## Authors

- [Conrad Bidrawn](https://www.github.com/ConradBdwn)
- [Raymond Huang](https://www.github.com/RaymondHuang44)
- [Andrew Kang](https://github.com/akangzork)
- [Cisco Velasquez](https://www.github.com/ciscovelasquez)


## System Requirements

OS: Windows 10, macOS, Unix

Language/runtime versions: Python 3, JavaScript (React + Node.js), CSS, JSON, HTML

Framework: React, Flask

Libraries: axios, ReactDOM, Flask, flask_cors, pandas, scikit-learn, json, math, random

## Installation

Install project by
```bash
    git clone https://github.com/RaymondHuang44/AI-Food-Recomendation-system-CPSC-481-Project.git
```

Download the Database from Kaggle
```bash
    https://www.kaggle.com/datasets/irkaal/foodcom-recipes-and-reviews/data
```
Unzip the file from Kaggle into the data folder

The `data` folder should look like this

```bash
/data
  L recipes.csv
  L recipes.parquet
  L reviews.csv
  L reviews.parquet
```
    
## Deployment

`Video Guides`

- [Windows](https://youtu.be/ot-tu12wgOk)
- [MacOS](https://youtu.be/mfnv05zZR1U)

To deploy this project

have `node.js` installed 

`cd into project folder`

### `Backend`

`create Vertual Envierment inside project folder`
```bash
    python3 -m venv env
```

`macOS and Linux`
```bash
    source env/bin/activate
```

`Windows`
```bash
    env\Scripts\activate
```

after going into the virtual environment, `install all python packages`
```bash
    pip install -r requirements.txt
```

then start/run the backend
`macOS and Linux`
```bash
    python3 app.py
```

`Windows`
```bash
    python app.py
```


### `Frontend`

In another terminal

cd into the project folder again

```bash
    cd food-rec-frontend
    npm install
    npm start
```
