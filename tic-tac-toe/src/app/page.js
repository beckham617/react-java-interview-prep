'use client';
import { useState } from 'react';
import './styles.css';


import Link from 'next/link';

export default function Home() {
  return (
    <div className="game">
      <div className="game-board">
        <Link href="/tic-tac-toe">
          <button className="game-button">
            Play Tic-Tac-Toe
          </button>
        </Link>
        <br />
        <br />
        <Link href="/product-table">
          <button className="game-button">
            Product Table
          </button>
        </Link>
        <br />
        <br />
        <Link href="/todo-list">
          <button className="game-button">
            Todo List
          </button>
        </Link>
      </div>
    </div>
  );
}