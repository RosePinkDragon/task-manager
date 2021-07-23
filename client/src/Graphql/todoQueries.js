import { gql } from "@apollo/client";

export const ADD_TODO = gql`
  mutation CreateTodoMutation(
    $taskTitle: String!
    $createdBy: String!
    $assignedTo: String!
    $status: String!
  ) {
    createTodo(
      taskTitle: $taskTitle
      createdBy: $createdBy
      assignedTo: $assignedTo
      status: $status
    ) {
      taskTitle
      createdBy
      assignedTo
      status
      createdAt
      updatedAt
    }
  }
`;

export const LOGIN_USER = gql`
  query Query($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user {
        name
        email
      }
      token
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation Query($id: Int!, $status: String!) {
    updateTodo(id: $id, status: $status) {
      success
      todo {
        id
      }
    }
  }
`;

export const GOOGLE_LOGIN = gql`
  query Query($email: String!, $name: String!) {
    loginGoogle(email: $email, name: $name) {
      user {
        name
        email
      }
      token
    }
  }
`;

export const GET_TODOS = gql`
  query Query($filterTitle: String!, $sortBy: String!) {
    getTodo(filterTitle: $filterTitle, sortBy: $sortBy) {
      count
      todo {
        id
        taskTitle
        createdBy
        status
        assignedTo
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_USERS = gql`
  query Query {
    getUsers {
      id
      name
    }
  }
`;
