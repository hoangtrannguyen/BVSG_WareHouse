import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchMasterData, getFunction } from "../../service/Data/getMasterData";
import { Card, Collapse, Spinner, Alert, Form } from "react-bootstrap";

const MasterDataDisplay = ({ onFeaturesChange, initialFeatures }) => {
  const {
    data: masterData,
    isLoading: isMasterDataLoading,
    error: masterDataError,
  } = useQuery("masterData", fetchMasterData);

  const {
    data: functionData,
    isLoading: isFunctionLoading,
    error: functionError,
  } = useQuery("functionData", getFunction);

  const [selectedClaimType, setSelectedClaimType] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    if (initialFeatures) {
      const initialCheckedItems = initialFeatures.reduce((acc, feature) => {
        acc[feature.claimValue] = true;
        return acc;
      }, {});
      setCheckedItems(initialCheckedItems);
    }
  }, [initialFeatures]);

  useEffect(() => {
    if (onFeaturesChange) {
      // Tạo danh sách tính năng đã chọn để gửi về
      const features = Object.keys(checkedItems)
        .filter((claimValue) => checkedItems[claimValue])
        .map((claimValue) => ({
          claimType:
            masterData?.responseData.find(
              (item) => item.claimValue === claimValue
            )?.claimType || "",
          claimValue,
        }));
      onFeaturesChange(features);
    }
  }, [checkedItems, onFeaturesChange, masterData?.responseData]);

  if (isMasterDataLoading || isFunctionLoading) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (masterDataError || functionError) {
    return <Alert variant="danger">Lỗi khi tải dữ liệu</Alert>;
  }

  if (!masterData?.responseData || !functionData?.responseData) {
    return <Alert variant="warning">Dữ liệu chưa sẵn sàng</Alert>;
  }

  const handleClaimTypeClick = (claimType) => {
    setSelectedClaimType((prev) => (prev === claimType ? null : claimType));
  };

  const handleCheckboxChange = (claimValue) => {
    setCheckedItems((prev) => ({
      ...prev,
      [claimValue]: !prev[claimValue],
    }));
  };

  const groupedData = masterData.responseData.reduce((acc, item) => {
    if (!acc[item.claimType]) {
      acc[item.claimType] = [];
    }
    acc[item.claimType].push(item);
    return acc;
  }, {});

  return (
    <div>
      <h5 className="mb-4">Roles :</h5>
      {functionData.responseData.map((item, index) => (
        <Card
          key={index}
          className="mb-3"
          onClick={() => handleClaimTypeClick(item.claimType)}
          aria-controls={`collapse-${item.claimType}`}
          aria-expanded={selectedClaimType === item.claimType}
          style={{ cursor: "pointer" }}
        >
          <Card.Header style={{ backgroundColor: "#DCE3F6" }}>
            {item.claimTypeDesc}
          </Card.Header>
          <Collapse in={selectedClaimType === item.claimType}>
            <div id={`collapse-${item.claimType}`}>
              <Card.Body>
                {groupedData[item.claimType]?.map((mdItem) => (
                  <Form.Check
                    key={mdItem.claimValue}
                    type="checkbox"
                    id={`checkbox-${mdItem.claimValue}`}
                    label={`${mdItem.claimValue}`}
                    checked={checkedItems[mdItem.claimValue] || false}
                    onChange={() => handleCheckboxChange(mdItem.claimValue)}
                    className="mb-2"
                  />
                ))}
              </Card.Body>
            </div>
          </Collapse>
        </Card>
      ))}
    </div>
  );
};

export default MasterDataDisplay;
