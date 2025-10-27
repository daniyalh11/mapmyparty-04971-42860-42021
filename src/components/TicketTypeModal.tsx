import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface TicketTypeModalProps {
  open: boolean;
  onClose: () => void;
  ticketType: "vip-guest" | "standard" | "table" | "group-pass";
  onSave: (data: any) => void;
}

const TicketTypeModal = ({ open, onClose, ticketType, onSave }: TicketTypeModalProps) => {
  const [ticketName, setTicketName] = useState("");
  const [ticketCategory, setTicketCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [maxPerCustomer, setMaxPerCustomer] = useState("");
  const [comingSoon, setComingSoon] = useState(false);
  const [onsiteOnly, setOnsiteOnly] = useState(false);
  const [gstOption, setGstOption] = useState("");
  const [customCgst, setCustomCgst] = useState("");
  const [customSgst, setCustomSgst] = useState("");
  const [customGst, setCustomGst] = useState("");
  const [ticketEntryType, setTicketEntryType] = useState("single");
  const [groupQuantity, setGroupQuantity] = useState("");
  const [tableQuantity, setTableQuantity] = useState("");

  const getTitle = () => {
    switch (ticketType) {
      case "vip-guest":
        return "Add VIP Guest List";
      case "standard":
        return "Add Standard Ticket";
      case "table":
        return "Add Table Ticket";
      case "group-pass":
        return "Add Group Pass";
      default:
        return "Add Ticket";
    }
  };

  const handleSave = () => {
    const data = {
      ticketName,
      ticketCategory,
      price: ticketType === "vip-guest" ? "0" : price,
      quantity,
      description,
      maxPerCustomer,
      comingSoon,
      onsiteOnly,
      gstOption: ticketType === "vip-guest" ? "none" : gstOption,
      customCgst,
      customSgst,
      customGst,
      ticketEntryType,
      groupQuantity,
      tableQuantity,
      type: ticketType,
    };
    onSave(data);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="ticketName">Ticket Name *</Label>
            <Input
              id="ticketName"
              placeholder="e.g., General Admission"
              value={ticketName}
              onChange={(e) => setTicketName(e.target.value)}
            />
          </div>

          {(ticketType === "vip-guest" || ticketType === "standard") && (
            <div>
              <Label htmlFor="ticketCategory">Ticket Type *</Label>
              <Select value={ticketCategory} onValueChange={setTicketCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Couple">Couple</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {ticketType === "group-pass" && (
            <div>
              <Label htmlFor="groupQuantity">Group Quantity *</Label>
              <Input
                id="groupQuantity"
                type="number"
                min="1"
                placeholder="e.g., 4"
                value={groupQuantity}
                onChange={(e) => setGroupQuantity(e.target.value)}
              />
            </div>
          )}

          {ticketType === "table" && (
            <div>
              <Label htmlFor="tableQuantity">Table Quantity *</Label>
              <Input
                id="tableQuantity"
                type="number"
                min="1"
                placeholder="e.g., 10"
                value={tableQuantity}
                onChange={(e) => setTableQuantity(e.target.value)}
              />
            </div>
          )}

          {ticketType !== "vip-guest" && (
            <>
              <div>
                <Label htmlFor="price">Price (₹) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  placeholder="49"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="gstOption">GST Options *</Label>
                <Select value={gstOption} onValueChange={setGstOption}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select GST option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0% GST</SelectItem>
                    <SelectItem value="cgst-sgst-9">CGST@9% + SGST/UTGST @9%</SelectItem>
                    <SelectItem value="igst-18">IGST @18%</SelectItem>
                    <SelectItem value="other-cgst-sgst">Other CGST + SGST</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {gstOption === "other-cgst-sgst" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customCgst">CGST (%)</Label>
                    <Input
                      id="customCgst"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="0"
                      value={customCgst}
                      onChange={(e) => setCustomCgst(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="customSgst">SGST (%)</Label>
                    <Input
                      id="customSgst"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="0"
                      value={customSgst}
                      onChange={(e) => setCustomSgst(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {gstOption === "other" && (
                <div>
                  <Label htmlFor="customGst">Custom GST (%)</Label>
                  <Input
                    id="customGst"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0"
                    value={customGst}
                    onChange={(e) => setCustomGst(e.target.value)}
                  />
                </div>
              )}
            </>
          )}

          <div>
            <Label htmlFor="quantity">Total Quantity *</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              placeholder="100"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what's included..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="maxPerCustomer">Max Per Customer</Label>
            <Input
              id="maxPerCustomer"
              type="number"
              min="1"
              placeholder="10"
              value={maxPerCustomer}
              onChange={(e) => setMaxPerCustomer(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="comingSoon"
                checked={comingSoon}
                onCheckedChange={(checked) => setComingSoon(checked as boolean)}
              />
              <Label htmlFor="comingSoon" className="cursor-pointer font-normal">
                Coming Soon
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="onsiteOnly"
                checked={onsiteOnly}
                onCheckedChange={(checked) => setOnsiteOnly(checked as boolean)}
              />
              <Label htmlFor="onsiteOnly" className="cursor-pointer font-normal">
                On-site Only
              </Label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Save Ticket
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketTypeModal;
