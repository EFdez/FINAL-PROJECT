import axios from 'axios'



class SchoolHackApi {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true,
    });

  }

  getAllCourses = () => this.service.get("/courses");
  updatedCourse = (course) => this.service.put(`/courses/${course._id}`, course)

  getAllStudent = () => this.service.get("/users?type=STUDENT")
  getAllUsers = () => this.service.get("/users?type=STUDENT,DIRECTOR,TEACHER");
  getOneUser = (id) => this.service.get(`/users/${id}`);
  createUser = (user) => this.service.post("/signup", user);
  updateUser = (user) => this.service.put(`/users/${user.id}`, user);
  deleteUser = (id) => this.service.delete(`/users/${id}`);

  getAllTeachers = () => this.service.get("/teachers");
  getUsersTeacher = (id) => this.service.get(`/teachers/${id}/users`);
  getCoursesTeacher = (id) => this.service.get(`/teachers/${id}/courses`);
  deleteTeacher = (id) => this.service.delete(`/teachers/${id}`);
  createTeacher = (teacher) => this.service.post("/signup", teacher);
  updateTeacher = (teacher) =>
    this.service.put(`/teachers/${teacher.id}`, teacher);

  getAllSubjects = () => this.service.get("/subjects");
  deleteSubject = (id) => this.service.delete(`/subjects/${id}`);
  updateSubject = (subject) =>
    this.service.put(`/subjects/${subject.id}`, subject);
  createSubject = (subject) => this.service.post("/subjects", subject);

  getAllEvents = () => this.service.get("/events");
  getOneEvent = (id) => this.service.get(`/events/${id}`);
  createEvents = (event) => this.service.post("/events", event);
  updateEvent = (event) => this.service.put(`/events/${event.id}`, event);
  deleteEvent = (id) => this.service.delete(`/events/${id}`);

  readMessage = (id) => this.service.put(`/messages/${id}/read`);
  getMessage = (id) => this.service.get(`/messages/${id}`);
  getAllMessages = () => this.service.get("/messages");
  getAllSendedMessages = (id) => this.service.get(`/messages/${id}/send`);
  getAllReceivedMessages = (id) => this.service.get(`/messages/${id}/received`);
  createMessages = (message) => this.service.post("/messages", message);
  deleteMessage = (id) => this.service.delete(`/messages/${id}`);
}

export default SchoolHackApi