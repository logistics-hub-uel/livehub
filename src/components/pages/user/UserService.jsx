import React, { useState, useEffect } from "react";
import {
  Container,
  Title,
  Table,
  Button,
  Modal,
  TextInput,
  Textarea,
  NumberInput,
  Switch,
  Select,
  Group,
  ActionIcon,
  Text,
  Paper,
  Loader,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
// Replace Tabler Icons with React Icons
import { FaPlus, FaEdit, FaTrash, FaImage } from "react-icons/fa";
import {
  GetUserServices,
  CreateService,
  UpdateService,
  DeleteService,
} from "../../../services/ServiceService";
import MultipleImageUpload from "../../common/MultipleImageUpload";
import AuthStore from "../../../store/AuthStore";
import { notifications } from "@mantine/notifications";

const UserService = () => {
  const { credentials } = AuthStore();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [currentService, setCurrentService] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    available_time_slots: [],
    images_urls: [],
    is_support_preference: false,
    preference_social_media: [],
    category: "",
  });
  const [imageUrls, setImageUrls] = useState([]);

  // Fetch user services
  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await GetUserServices(credentials.user_id);
      setServices(response.data.data);
    } catch (error) {
      console.error("Error fetching services:", error);
      notifications.show({
        title: "Error",
        message: "Failed to load services",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (credentials.user_id) {
      fetchServices();
    }
  }, [credentials.user_id]);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Handle image uploads completion
  const handleImagesUploaded = (urls) => {
    setImageUrls(urls);
    setFormData({ ...formData, images_urls: urls });
  };

  // Open modal for creating a new service
  const handleCreateService = () => {
    setCurrentService(null);
    setFormData({
      name: "",
      description: "",
      price: 0,
      available_time_slots: [],
      images_urls: [],
      is_support_preference: false,
      preference_social_media: [],
      category: "",
    });
    setImageUrls([]);
    open();
  };

  // Open modal for editing an existing service
  const handleEditService = (service) => {
    setCurrentService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      available_time_slots: service.available_time_slots || [],
      images_urls: service.images_urls || [],
      is_support_preference: service.is_support_preference || false,
      preference_social_media: service.preference_social_media || [],
      category: service.category || "",
    });
    setImageUrls(service.images_urls || []);
    open();
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      if (currentService) {
        // Update existing service
        await UpdateService(currentService.id, {
          ...formData,
          supplier_id: credentials.user_id,
        });
        notifications.show({
          title: "Success",
          message: "Service updated successfully",
          color: "green",
        });
      } else {
        // Create new service
        await CreateService({
          ...formData,
          supplier_id: credentials.user_id,
        });
        notifications.show({
          title: "Success",
          message: "Service created successfully",
          color: "green",
        });
      }
      close();
      fetchServices();
    } catch (error) {
      console.error("Error saving service:", error);
      notifications.show({
        title: "Error",
        message: "Failed to save service",
        color: "red",
      });
    }
  };

  // Handle service deletion
  const handleDeleteService = async (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await DeleteService(serviceId);
        fetchServices();
        notifications.show({
          title: "Success",
          message: "Service deleted successfully",
          color: "green",
        });
      } catch (error) {
        console.error("Error deleting service:", error);
        notifications.show({
          title: "Error",
          message: "Failed to delete service",
          color: "red",
        });
      }
    }
  };

  return (
    <Container size="lg" py="xl">
      <Group position="apart" mb="md">
        <Title order={2}>My Services</Title>
        <Button leftIcon={<FaPlus size={16} />} onClick={handleCreateService}>
          Add New Service
        </Button>
      </Group>

      {loading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", padding: "2rem" }}
        >
          <Loader />
        </Box>
      ) : services.length === 0 ? (
        <Paper p="xl" withBorder>
          <Text align="center">You don't have any services yet.</Text>
        </Paper>
      ) : (
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Images</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>${service.price}</td>
                <td>{service.category || "N/A"}</td>
                <td>{(service.images_urls || []).length} images</td>
                <td>
                  <Group spacing={8}>
                    <ActionIcon
                      color="blue"
                      onClick={() => handleEditService(service)}
                    >
                      <FaEdit size={16} />
                    </ActionIcon>
                    <ActionIcon
                      color="red"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <FaTrash size={16} />
                    </ActionIcon>
                  </Group>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal for creating/editing services */}
      <Modal
        opened={opened}
        onClose={close}
        title={currentService ? "Edit Service" : "Create New Service"}
        size="lg"
      >
        <TextInput
          label="Service Name"
          placeholder="Enter service name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          required
          mb="md"
        />

        <Textarea
          label="Description"
          placeholder="Enter service description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          minRows={3}
          mb="md"
        />

        <NumberInput
          label="Price"
          placeholder="Enter price"
          value={formData.price}
          onChange={(value) => handleInputChange("price", value)}
          precision={2}
          mb="md"
        />

        <Select
          label="Category"
          placeholder="Select a category"
          value={formData.category}
          onChange={(value) => handleInputChange("category", value)}
          data={[
            { value: "social_media", label: "Social Media" },
            { value: "design", label: "Design" },
            { value: "marketing", label: "Marketing" },
            { value: "other", label: "Other" },
          ]}
          mb="md"
        />

        <Switch
          label="Support preference"
          checked={formData.is_support_preference}
          onChange={(e) =>
            handleInputChange("is_support_preference", e.currentTarget.checked)
          }
          mb="md"
        />

        <Text size="sm" weight={500} mb="xs">
          Service Images
        </Text>
        <MultipleImageUpload
          onImagesUploaded={handleImagesUploaded}
          existingImages={imageUrls}
        />

        <Group position="right" mt="xl">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {currentService ? "Update" : "Create"}
          </Button>
        </Group>
      </Modal>
    </Container>
  );
};

export default UserService;
