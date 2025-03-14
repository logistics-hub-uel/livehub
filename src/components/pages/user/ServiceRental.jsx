import { Tabs, Modal, TextInput, Textarea, Input } from "@mantine/core";
import { DatePicker, DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { FaRulerHorizontal } from "react-icons/fa";
import { FiHeart, FiPower } from "react-icons/fi";
import { notifications } from "@mantine/notifications";

import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  Image,
  Text,
} from "@mantine/core";
import classes from "./BadgeCard.module.css";
import { CreateRental, GetRentals } from "../../../services/RentalService";
import { GetServices } from "../../../services/ServiceService";
import GenericTable from "../../ui/GenericTable";
import AuthStore from "../../../store/AuthStore";

const mockdata = {
  image:
    "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
  title: "Verudela Beach",
  country: "Croatia",
  description:
    "Completely renovated for the season 2020, Arena Verudela Bech Apartments are fully equipped and modernly furnished 4-star self-service apartments located on the Adriatic coastline by one of the most beautiful beaches in Pula.",
  badges: [
    { emoji: "☀️", label: "Sunny weather" },
    { emoji: "🦓", label: "Onsite zoo" },
    { emoji: "🌊", label: "Sea" },
    { emoji: "🌲", label: "Nature" },
    { emoji: "🤽", label: "Water sports" },
  ],
};

export function BadgeCard({ service, onRent }) {
  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image
          src={service.images_urls[0] || "https://placehold.co/600x400"}
          alt={service.name}
          height={180}
        />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {service.name}
          </Text>
          <Badge size="sm" variant="light">
            ${service.price}
          </Badge>
        </Group>
        <Text fz="sm" mt="xs">
          {service.description}
        </Text>
      </Card.Section>

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }} onClick={() => onRent(service)}>
          Rent Now
        </Button>
      </Group>
    </Card>
  );
}

const RentalForm = ({ opened, close, service, onSubmit }) => {
  const [form, setForm] = useState({
    from_date: null,
    to_date: null,
    demand_description: "",
    expectation: "",
  });

  const handleSubmit = () => {
    onSubmit({
      ...form,
      service_id: service?.id,
      status: "pending",
    });
    close();
  };

  return (
    <Modal opened={opened} onClose={close} title="Rent Service">
      <div className="space-y-4 flex flex-col">
        <DatePickerInput
          label="Ngày bắt đầu thuê"
          value={form.from_date}
          onChange={(date) => setForm({ ...form, from_date: date })}
          placeholder="Bắt đầu thuê từ"
        />

        <DatePickerInput
          label="Thuê đến ngày"
          placeholder="To date"
          value={form.to_date}
          onChange={(date) => setForm({ ...form, to_date: date })}
        />
        <Textarea
          label="
            Mô tả nhu cầu
          "
          value={form.demand_description}
          onChange={(e) =>
            setForm({ ...form, demand_description: e.target.value })
          }
        />
        <Textarea
          label="Mong muốn"
          value={form.expectation}
          onChange={(e) => setForm({ ...form, expectation: e.target.value })}
        />
        <Button fullWidth onClick={handleSubmit}>
          Submit Request
        </Button>
      </div>
    </Modal>
  );
};

const ServiceRental = () => {
  const [rentals, setRentals] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  const fetchRentals = async () => {
    setLoading(true);
    try {
      const response = await GetRentals();
      setRentals(response.data.data || []);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to load rentals",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    setLoading(true);
    const response = await GetServices();
    setServices(response.data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRentals();
    fetchServices();
  }, []);

  const {
    credentials: { user_id },
  } = AuthStore();
  const handleRentService = async (serviceData) => {
    try {
      const response = await CreateRental({
        ...serviceData,
        buyer_id: user_id,
      });
      notifications.show({
        title: "Success",
        message: "Service rental created successfully",
        color: "green",
      });
      fetchRentals(); // Refresh rentals list
      close();
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error.message || "Failed to create rental",
        color: "red",
      });
    }
  };

  const rentalTableHeaders = [
    {
      key: "service_id",
      label: "Service",
      render: (value, row) => {
        const service = services.find((s) => s.id === value);
        return service?.name || value;
      },
    },
    {
      key: "from_date",
      label: "From Date",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: "to_date",
      label: "To Date",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <Badge color={value === "pending" ? "yellow" : "green"}>{value}</Badge>
      ),
    },
  ];

  return (
    <>
      <Tabs defaultValue="gallery">
        <Tabs.List>
          <Tabs.Tab value="gallery">Dịch vụ</Tabs.Tab>
          <Tabs.Tab value="messages">Dịch vụ đang thuê</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery">
          <div className="flex items-center flex-wrap gap-4 p-4">
            {services.map((service) => (
              <div key={service.id} className="w-80">
                <BadgeCard
                  service={service}
                  onRent={(service) => {
                    setSelectedService(service);
                    open();
                  }}
                />
              </div>
            ))}
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="messages">
          <GenericTable
            headers={rentalTableHeaders}
            data={rentals}
            hideDelete
            hideEdit
          />
        </Tabs.Panel>
      </Tabs>

      <RentalForm
        opened={opened}
        close={close}
        service={selectedService}
        onSubmit={handleRentService}
      />
    </>
  );
};

export default ServiceRental;
