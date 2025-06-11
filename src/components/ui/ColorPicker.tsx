
import React, { useState, useRef, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Palette } from "lucide-react";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState(color);
  const colorInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentColor(color);
  }, [color]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentColor(e.target.value);
  };

  const applyColor = () => {
    onChange(currentColor);
    setIsOpen(false);
  };

  const predefinedColors = [
    "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF", 
    "#FFFF00", "#00FFFF", "#FF00FF", "#C0C0C0", "#808080", 
    "#800000", "#808000", "#008000", "#800080", "#008080", 
    "#000080", "#FFA500", "#A52A2A", "#FFD700", "#32CD32"
  ];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="w-10 h-10 p-0 border-gray-200" 
          style={{ backgroundColor: color }}
        >
          <span className="sr-only">Pick a color</span>
          <Palette className="h-4 w-4 absolute opacity-70" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="color-picker">Pick a color</Label>
            <div className="flex gap-2">
              <Input
                ref={colorInputRef}
                id="color-picker"
                type="color"
                value={currentColor}
                onChange={handleColorChange}
                className="w-10 h-10 p-1 cursor-pointer"
              />
              <Input
                value={currentColor}
                onChange={(e) => setCurrentColor(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-xs">Preset Colors</Label>
            <div className="grid grid-cols-5 gap-2">
              {predefinedColors.map((presetColor, index) => (
                <Button
                  key={index}
                  type="button"
                  className="w-8 h-8 p-0 rounded-md"
                  style={{ backgroundColor: presetColor }}
                  variant="outline"
                  onClick={() => {
                    setCurrentColor(presetColor);
                    if (colorInputRef.current) {
                      colorInputRef.current.value = presetColor;
                    }
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button size="sm" onClick={applyColor}>
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
