import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import "./Card.css";

const Container = styled.div`
  width: 280px; /* Slightly wider for better spacing */
  background: linear-gradient(145deg, #2c2c2c, #1a1a1a); /* Subtle gradient */
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3); /* Enhanced shadow */
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative; /* For positioning the delete button */

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 10px 24px rgba(0, 0, 0, 0.5);
  }
`;

const Title = styled.h3`
  font-size: 22px; /* Larger size for better visibility */
  font-weight: bold;
  color: #ffffff;
  margin: 0;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); /* Subtle glow */
`;

const Description = styled.p`
  font-size: 16px;
  color: #e0e0e0;
  line-height: 1.6;
  margin: 0;
`;

const Deadline = styled.p`
  font-size: 14px;
  color: #bbbbbb;
  margin: 0;
`;

const Priority = styled.div`
  padding: 6px 12px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 8px;
  display: inline-block;

  ${({ priority }) =>
    priority === "High" &&
    `
    background-color: rgba(255, 69, 69, 0.2);
    color: #ff4d4d;
  `}

  ${({ priority }) =>
    priority === "Medium" &&
    `
    background-color: rgba(48, 209, 88, 0.2);
    color: #30d158;
  `}

  ${({ priority }) =>
    priority === "Low" &&
    `
    background-color: rgba(255, 214, 10, 0.2);
    color: #ffd60a;
  `}
`;

const DeleteButton = styled.button`
  position: absolute;
  bottom: 12px; /* Positioned at the bottom */
  right: 12px; /* Positioned at the right */
  background-color: #ff4d4d;
  color: white;
  border: none;
  font-size: 24px; /* Larger size for visibility */
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff1a1a; /* Darker red on hover */
  }

  &:focus {
    outline: none; /* Removes focus outline */
  }
`;

export default function Task({ task, index }) {
  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={{
            ...provided.draggableProps.style,
            background: snapshot.isDragging
              ? "rgba(255, 255, 255, 0.1)"
              : "linear-gradient(145deg, #2c2c2c, #1a1a1a)",
          }}
        >
          <DeleteButton>&times;</DeleteButton> {/* "x" symbol on the button */}
          <Title>{task.title}</Title>
          <Description>{task.description}</Description>
          <Deadline>Deadline: {task.deadline}</Deadline>
          <Priority priority={task.priority}>{task.priority} Priority</Priority>
        </Container>
      )}
    </Draggable>
  );
}
