# Start with the python:3.9 image
FROM python:3.9

# Set up enviroment variables
ENV REACT_APP_BASE_URL=https://coinblock-trading.herokuapp.com/
ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True

# EXPOSE 8000

# Set the directory for upcoming commands to /var/www
WORKDIR /var/www

# Copy all the files from your repo to the working directory
COPY . .
COPY /react-app/build/* app/static/


# Run the next two python install commands with PIP
RUN pip install -r requirements.txt
RUN pip install psycopg2

# Start the flask environment by setting our
CMD gunicorn app:app
