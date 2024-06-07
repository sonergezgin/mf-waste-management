import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useLogout from "../hooks/useLogout";

import Form from 'react-bootstrap/Form';

import axios from "../api/axios";

import useAuth from "../hooks/useAuth"


import React, { Component } from 'react';
/* import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarController,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    BarController
); */

import { Chart } from 'primereact/chart';

const Statistics = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.form?.pathname || "/";

    const logout = useLogout()

    const { auth, persist } = useAuth();

    const [wasteTypes, setWasteTypes] = useState([]);
    const [weight, setWeight] = useState(0);

    const [choosenWasteType, setChoosenWasteType] = useState("");

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const colors = ['green', 'red', 'yellow', 'purple', 'brown', 'orange']

    const dummyObject = {
        "chart": [
            {
                "facultyName": "Mühendislik",
                "data": [
                    {
                        "Kompozit Atık": 16
                    },
                    {
                        "Elektronik Atık": 12
                    }
                ]
            },
            {
                "facultyName": "Eğitim",
                "data": [
                    {
                        "Elektronik Atık": 50
                    }
                ]
            }
        ]
    }

    const rankByFaculty = () => {

        let labels = [];
        for (let i = 0; i < dummyObject.chart.length; i++) {

            const eachFacultyObject = dummyObject.chart[i];

            const nameOfFaculty = eachFacultyObject.facultyName;
            const totalWaste = eachFacultyObject.data.reduce((each, acc) => acc + eachFacultyObject.data[each])


        }

    }
    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['FEF', 'B', 'C'],
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--green-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--red-400'),
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }
            ]
        }
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    /* 
        const data = {
            labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
            datasets: [
                {
                    label: 'Data Series 1',
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    data: [12, 19, 3, 5, 2],
                },
            ],
        };
    
        const options = {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        };
     */

    return (
        <section>
            <h1>Statistics</h1>
            <br />
            {/* 
            <div>
                <Bar data={data} options={options} />
            </div> */}

            <div className="card flex justify-content-center">
                <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
            </div>

        </section>
    )
}

export default Statistics;