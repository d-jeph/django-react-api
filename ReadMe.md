## Django Rest API with React JS
This a simple CRUD api application that supports the following technologies:
* [Django](https://www.djangoproject.com/) for the application backend
* [django-rest-framework](https://www.django-rest-framework.org/) for data Serialization
* [React](https://reactjs.org/) framework for the api frontend and UI design
* [Django Swagger](https://django-rest-swagger.readthedocs.io/en/latest/) for Api Documentation

To test the application locally you will need to have the following tools installed: 
* python
* virtualenv
* node js and npm
* git

## Setup
### Backend/Server
* First ensure you have python globally installed in your computer. If not, you can get python [here](https://www.python.org").
* After doing this, confirm that you have installed virtualenv globally as well. If not, run this:
    ```bash
        $ pip install virtualenv
    ```
* Then, Git clone this repo to your PC
    ```bash
        $ git clone https://github.com/d-jeph/django-react-api.git
    ```

* #### Dependencies
    1. Cd into your the cloned repo as such:
        ```bash
            $ cd django-react-api
        ```
    2. Create and fire up your virtual environment:
        ```bash
            $ virtualenv  venv -p python3
            $ source venv/bin/activate
        ```
    3. Install the dependencies needed to run the app:
        ```bash
            $ pip install -r requirements.txt
        ```
    4. Make those migrations work
        ```bash
            $ python manage.py makemigrations
            $ python manage.py migrate
        ```

* #### Run It
    Fire up the server using this one simple command:
    ```bash
        $ python manage.py runserver
    ```
    You can now access the api at.
    ```
        http://localhost:8000/
    ```

    
#### Fronted/Client
    1. Cd into your the cloned repo as such:
        ```bash
            $ cd django-react-api/frontend/
        ```
    2. Run the commands:
        ```bash
            $ npm install
            $ npm start
        ```
    3. You can now access the api client at:
        ```
        http://localhost:3000/





