import React, { useEffect, useState } from "react";
import {
  CreateService,
  GetUserServices,
  UpdateService,
  DeleteService,
} from "../../../services/ServiceService";
import AuthStore from "../../../store/AuthStore";
import GenericTable from "../../ui/GenericTable";
import { formRootRule, useForm } from "@mantine/form";

import {
  Button,
  Checkbox,
  Divider,
  JsonInput,
  Modal,
  MultiSelect,
  Pill,
  PillsInput,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ImageUploader from "../../ui/ImageUploader";

const UserService = () => {
  const [services, setServices] = useState();
  const [selectedService, setSelectedService] = useState(null);
  const {
    credentials: { user_id },
  } = AuthStore((state) => state);

  const [createOpened, { open: openCreate, close: closeCreate }] =
    useDisclosure(false);
  const [editOpened, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);
  const [viewOpened, { open: openView, close: closeView }] =
    useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);

  const createForm = useForm({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      preference_social_media: [],
      category: "",
      available_time_slots: {},
      is_support_preference: false,
      images_urls: [],
    },
  });

  const editForm = useForm({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      preference_social_media: [],
      category: "",
      available_time_slots: {},
      is_support_preference: false,
      images_urls: [],
    },
  });

  const handleEdit = (id) => {
    const service = services.find((s) => s.id === id);
    setSelectedService(service);
    editForm.setValues(service);
    openEdit();
  };

  const handleView = (id) => {
    const service = services.find((s) => s.id === id);
    setSelectedService(service);
    openView();
  };

  const handleDelete = (id) => {
    const service = services.find((s) => s.id === id);
    setSelectedService(service);
    openDelete();
  };

  const refreshServices = async () => {
    let response = await GetUserServices(user_id);
    setServices(response.data.data);
  };

  useEffect(() => {
    refreshServices();
  }, []);

  return (
    <div>
      <div className="flex items-center gap-4">
        <Title>Dịch vụ của tôi</Title>
        <Button
          onClick={() => {
            openCreate();
          }}
        >
          Tạo dịch vụ mới
        </Button>
      </div>

      <Modal
        centered
        opened={createOpened}
        onClose={closeCreate}
        title="Tạo dịch vụ mới"
      >
        <TextInput
          label="Tên dịch vụ"
          key={createForm.key("name")}
          {...createForm.getInputProps("name")}
          placeholder="Nhập tên dịch vụ"
        />
        <TextInput
          label="Mô tả"
          key={createForm.key("description")}
          {...createForm.getInputProps("description")}
          placeholder="Nhập mô tả"
        />
        <TextInput
          label="Giá"
          type="number"
          key={createForm.key("price")}
          {...createForm.getInputProps("price")}
          placeholder="Nhập giá"
          rightSection={<Text>đ</Text>}
        />
        <Checkbox
          className="my-4"
          defaultChecked
          color="green.4"
          onChange={(e) => {
            createForm.setValues({
              is_support_preference: e.target.checked,
            });
          }}
          value={createForm.values.is_support_preference}
          iconColor="dark.8"
          size="md"
          label="Có thể hỗ trợ"
        />
        <TextInput
          label="Liên kết mạng xã hội"
          placeholder=""
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createForm.setValues({
                preference_social_media: [
                  ...createForm.values.preference_social_media,
                  e.target.value,
                ],
              });
              e.target.value = "";
            }
          }}
        />
        <div className="p-2 flex gap-2">
          {createForm.values.preference_social_media.map(
            (socialMedia, index) => (
              <div>
                <Pill
                  size="lg"
                  key={index}
                  onClose={() => {
                    setpreference_social_media(
                      preference_social_media.filter((_, i) => i !== index)
                    );
                  }}
                  withRemoveButton
                  onRemove={() => {
                    setpreference_social_media(
                      preference_social_media.filter((_, i) => i !== index)
                    );
                  }}
                >
                  {socialMedia}
                </Pill>
              </div>
            )
          )}
        </div>
        <TextInput
          label="Thể loại"
          placeholder="Loại dịch vụ mà bạn cung cấp"
        />
        <div className="m-0 mt-4 border-[1px] rounded-xl border-gray-200 p-4">
          <ImageUploader
            images={createForm.values.images_urls}
            setImages={(newImagesUrls) => {
              createForm.setValues({
                images_urls: [
                  ...createForm.values.images_urls,
                  ...newImagesUrls,
                ],
              });
            }}
          />
        </div>
        <Divider className="p-2 mt-4" />
        <Button
          color="blue"
          onClick={async () => {
            let request = {
              name: createForm.values.name,
              description: createForm.values.description,
              price: createForm.values.price,
              preference_social_media:
                createForm.values.preference_social_media,
              category: createForm.values.category,
              available_time_slots: createForm.values.available_time_slots,
              is_support_preference: createForm.values.is_support_preference,
              images_urls: createForm.values.images_urls,
              supplier_id: user_id,
            };
            let response = await CreateService(request);
            closeCreate();
            refreshServices();
          }}
        >
          Tạo dịch vụ
        </Button>
      </Modal>

      <Modal
        centered
        opened={editOpened}
        onClose={closeEdit}
        title="Chỉnh sửa dịch vụ"
      >
        <TextInput
          label="Tên dịch vụ"
          {...editForm.getInputProps("name")}
          placeholder="Nhập tên dịch vụ"
        />
        <TextInput
          label="Mô tả"
          {...editForm.getInputProps("description")}
          placeholder="Nhập mô tả"
        />
        <TextInput
          label="Giá"
          type="number"
          {...editForm.getInputProps("price")}
          placeholder="Nhập giá"
          rightSection={<Text>đ</Text>}
        />
        <Checkbox
          className="my-4"
          color="green.4"
          onChange={(e) => {
            editForm.setValues({
              is_support_preference: e.target.checked,
            });
          }}
          value={editForm.values.is_support_preference}
          iconColor="dark.8"
          size="md"
          label="Có thể hỗ trợ"
        />
        <TextInput
          label="Liên kết mạng xã hội"
          placeholder=""
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              editForm.setValues({
                preference_social_media: [
                  ...editForm.values.preference_social_media,
                  e.target.value,
                ],
              });
              e.target.value = "";
            }
          }}
        />
        <div className="p-2 flex gap-2">
          {editForm.values.preference_social_media.map((socialMedia, index) => (
            <div>
              <Pill
                size="lg"
                key={index}
                onClose={() => {
                  setpreference_social_media(
                    preference_social_media.filter((_, i) => i !== index)
                  );
                }}
                withRemoveButton
                onRemove={() => {
                  setpreference_social_media(
                    preference_social_media.filter((_, i) => i !== index)
                  );
                }}
              >
                {socialMedia}
              </Pill>
            </div>
          ))}
        </div>
        <TextInput
          label="Thể loại"
          placeholder="Loại dịch vụ mà bạn cung cấp"
          {...editForm.getInputProps("category")}
        />
        <div className="m-0 mt-4 border-[1px] rounded-xl border-gray-200 p-4">
          <ImageUploader
            images={editForm.values.images_urls}
            setImages={(newImagesUrls) => {
              editForm.setValues({
                images_urls: [...editForm.values.images_urls, ...newImagesUrls],
              });
            }}
          />
        </div>
        <Divider className="p-2 mt-4" />
        <Button
          color="blue"
          onClick={async () => {
            await UpdateService(selectedService.id, {
              ...editForm.values,
              supplier_id: user_id,
            });
            await refreshServices();
            closeEdit();
          }}
        >
          Cập nhật
        </Button>
      </Modal>

      <Modal
        centered
        opened={viewOpened}
        onClose={closeView}
        title="Chi tiết dịch vụ"
      >
        {selectedService && (
          <div>
            <Text>Tên: {selectedService.name}</Text>
            <Text>Mô tả: {selectedService.description}</Text>
            <Text>Giá: {selectedService.price}đ</Text>
            <Text>Thể loại: {selectedService.category}</Text>
            <Text>
              Hỗ trợ: {selectedService.is_support_preference ? "Có" : "Không"}
            </Text>
            <Text>
              Mạng xã hội: {selectedService.preference_social_media.join(", ")}
            </Text>
          </div>
        )}
      </Modal>

      <Modal
        centered
        opened={deleteOpened}
        onClose={closeDelete}
        title="Xác nhận xóa"
      >
        {selectedService && (
          <>
            <Text>Bạn có chắc muốn xóa dịch vụ "{selectedService.name}"?</Text>
            <div className="flex gap-2 mt-4">
              <Button
                color="red"
                onClick={async () => {
                  await DeleteService(selectedService.id);
                  await refreshServices();
                  closeDelete();
                }}
              >
                Xóa
              </Button>
              <Button variant="outline" onClick={closeDelete}>
                Hủy
              </Button>
            </div>
          </>
        )}
      </Modal>

      <div className="flex w-full flex-wrap">
        <GenericTable
          headers={[
            {
              key: "name",
              label: "Tên dịch vụ",
            },
            {
              key: "description",
              label: "Mô tả",
            },
            {
              key: "price",
              label: "Giá",
            },
            {
              key: "category",
              label: "Thể loại",
            },
            {
              key: "is_support_preference",
              label: "Hỗ trợ",
            },
            {
              key: "preference_social_media",
              label: "Mạng xã hội",
            },
          ]}
          data={
            services
              ? services.map((service) => ({
                  ...service,
                  is_support_preference: service.is_support_preference
                    ? "Có"
                    : "Không",
                  preference_social_media:
                    service.preference_social_media.join(", "),
                  images_urls: service.images_urls.join(", "),
                  available_time_slots: JSON.stringify(
                    service.available_time_slots
                  ),
                }))
              : []
          }
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      </div>
    </div>
  );
};

export default UserService;
