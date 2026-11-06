import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Group, Paper, SimpleGrid, Skeleton, Stack, Text, Title } from "@mantine/core";
import { AuthContext } from "../context/auth.context";
import PageLoader from "../components/PageLoader";
import { formatDate } from "../utils/formatDate";
import "./HomePage.css";

const API_URL = import.meta.env.VITE_API_URL;

const unsplash = (photoId) => `https://images.unsplash.com/${photoId}?w=800&q=80&auto=format&fit=crop`;

// Fotos del mosaico de la portada (las mismas que las disciplinas por defecto)
const HERO_PHOTOS = [
  { name: "Running", src: unsplash("photo-1744060204728-f68e434a3edf") },
  { name: "Swimming", src: unsplash("photo-1519315901367-f34ff9154487") },
  { name: "Hyrox", src: unsplash("photo-1751456357786-68c278e9063c") },
];

const FEATURES = [
  {
    title: "Your disciplines",
    text: "Start with seven ready-made sports, then add, edit or remove your own.",
  },
  {
    title: "Every session logged",
    text: "Title, notes and exercises for each workout, grouped by discipline.",
  },
  {
    title: "Your history at a glance",
    text: "Filter by sport and open any session to see exactly what you did.",
  },
];

function GuestHome() {
  return (
    <Stack gap={64}>
      <section className="home-hero">
        <div className="home-hero__text">
          <Text className="home-eyebrow">Training log for multi-sport athletes</Text>
          <Title order={1} className="home-hero__title">
            Every session, every sport, one log.
          </Title>
          <Text size="lg" c="dimmed" mt="md" maw={460}>
            Plan, log and review your workouts across running, cycling, gym, Hyrox and more.
          </Text>
          <Group mt="xl">
            <Button component={Link} to="/signup" size="md">Get started</Button>
            <Button component={Link} to="/login" size="md" variant="default">Log in</Button>
          </Group>
        </div>

        <div className="home-mosaic" aria-hidden="true">
          {HERO_PHOTOS.map((photo, index) => (
            <figure key={photo.name} className={`home-mosaic__tile home-mosaic__tile--${index}`}>
              <img src={photo.src} alt="" />
              <figcaption>{photo.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section>
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
          {FEATURES.map((feature, index) => (
            <div key={feature.title} className="home-feature">
              <span className="home-feature__number">{String(index + 1).padStart(2, "0")}</span>
              <Title order={3} mt="xs">{feature.title}</Title>
              <Text c="dimmed" mt={6}>{feature.text}</Text>
            </div>
          ))}
        </SimpleGrid>
      </section>
    </Stack>
  );
}

function UserHome({ user }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const headers = { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } };

    Promise.all([
      axios.get(`${API_URL}/api/workouts`, headers),
      axios.get(`${API_URL}/api/disciplines`, headers),
    ])
      .then(([workoutsRes, disciplinesRes]) => {
        const workouts = workoutsRes.data;
        const latest = [...workouts].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))[0];
        setStats({ workouts: workouts.length, disciplines: disciplinesRes.data.length, latest });
      })
      .catch((error) => {
        console.log(error);
        setStats({ workouts: null, disciplines: null, latest: null });
      });
  }, []);

  const statCards = [
    { label: "Workouts logged", value: stats?.workouts },
    { label: "Disciplines", value: stats?.disciplines },
  ];

  return (
    <Stack gap="xl">
      <div>
        <Text className="home-eyebrow">Your training log</Text>
        <Title order={1} className="home-hero__title">Welcome back, {user?.name}</Title>
        <Group mt="lg">
          <Button component={Link} to="/workouts" size="md">View workouts</Button>
          <Button component={Link} to="/disciplines" size="md" variant="default">Manage disciplines</Button>
        </Group>
      </div>

      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
        {statCards.map((stat) => (
          <Paper key={stat.label} withBorder radius="lg" p="lg">
            <Text size="sm" c="dimmed">{stat.label}</Text>
            {stats === null ? (
              <Skeleton height={36} width={60} mt={6} />
            ) : (
              <Text className="home-stat__value">{stat.value ?? "–"}</Text>
            )}
          </Paper>
        ))}

        <Paper withBorder radius="lg" p="lg">
          <Text size="sm" c="dimmed">Latest session</Text>
          {stats === null ? (
            <Skeleton height={36} mt={6} />
          ) : stats.latest ? (
            <>
              <Text
                component={Link}
                to={`/workouts/${stats.latest._id}`}
                className="home-latest__title"
              >
                {stats.latest.title}
              </Text>
              <Text size="xs" c="dimmed">
                {stats.latest.discipline?.name}
                {stats.latest.createdAt && `, ${formatDate(stats.latest.createdAt)}`}
              </Text>
            </>
          ) : (
            <Text mt={6}>
              No sessions yet.{" "}
              <Text component={Link} to="/workouts" c="lane.7" fw={500}>Log your first one</Text>
            </Text>
          )}
        </Paper>
      </SimpleGrid>
    </Stack>
  );
}

export default function HomePage() {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);

  if (isLoading) return <PageLoader />;
  return isLoggedIn ? <UserHome user={user} /> : <GuestHome />;
}
