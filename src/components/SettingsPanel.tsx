import React from 'react';

interface SettingsPanelProps {
  label: string;
  onLabelChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ label, onLabelChange }) => (
  <div className="settings-panel">
    <input type="text" value={label} onChange={onLabelChange} />
  </div>
);

export default SettingsPanel;