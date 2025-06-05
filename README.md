# 🌍 Earthquake Dashboard

A responsive, interactive dashboard that visualizes real-time earthquake data from the USGS. Built using modern frontend tools like React, TypeScript, Tailwind CSS, and Recharts.

> GitHub Repo: [Ashishv23/earthquake-dashboard](https://github.com/Ashishv23/earthquake-dashboard)

---

## 🚀 Project Overview

This project is part of a technical challenge to showcase frontend development skills. The app presents recent earthquake events from around the world using:
- A dynamic chart for geographic data insights
- A scrollable table to explore raw data
- Two-way interactions between chart and table
- Performance-optimized CSV parsing using a Web Worker

---

## 🧰 Tech Stack

| Technology            | Purpose                                      |
|-----------------------|---------------------------------------------=|
| **React + TypeScript**| Frontend framework                           |
| **Vite**              | Fast dev server and bundler                  |
| **Tailwind CSS**      | Responsive styling utility                   |
| **Recharts**          | Charting library (scatter plot)              |
| **TanStack Query**    | Data fetching, caching, and loading state    |
| **Zustand**           | Global store for chart axis selection        |
| **React Context**     | Manage currently selected earthquake row     |
| **Web Worker**        | Background thread to parse a large CSV file  |
| **Git + GitHub**      | Version control and collaboration            |

---

## 🚀 Getting Started

```bash
git clone https://github.com/Ashishv23/earthquake-dashboard.git
cd earthquake-dashboard
npm install
npm run dev
