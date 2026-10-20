---
sidebar_position: 79
---

# Bone

`Bone` holds the bones of a character's skeleton: the body parts (head, hands, feet, spine, ...) and the helper points the game attaches things to (weapons, the grappling hook, the parachute). Use it to get where a body part of a player is, for example to draw a name tag above the head.

**Available on:** Client

## Values {#values}

### Bone {#bone}

Each value is a 32-bit hash of the bone's name. The values are opaque numbers: compare and pass them, don't do math on them.

Used by [`player:GetBonePosition(bone)`](../objects/player.md) (client): the world position of that bone of a player whose character is spawned in the local game, smoothed for rendering (so it matches what is drawn this frame). It returns `vec3(0, 0, 0)` when the character's skeleton has no such bone, and `nil` while the player's character isn't spawned in the local game (for example when the player is too far away).

All the bones below are part of the standard human skeleton the player characters use. Clothing flaps and some attach points may not exist on every skin.

| Name | Value | Meaning |
|---|---|---|
| `Bone.Reference` | `0x8EB2FD7C` | The root of the skeleton, on the ground under the character. |
| `Bone.Offset` | `0x4AAA87DB` | The skeleton's offset bone, just above the root. |
| `Bone.Hips` | `0x58C4C160` | The hips (pelvis), the center of the body. |
| `Bone.Spine1` | `0xF3799475` | The lower spine. |
| `Bone.Spine2` | `0xCF4D7850` | The middle spine. |
| `Bone.Spine3` | `0xC026B1C5` | The upper spine (chest). |
| `Bone.Neck1` | `0x57047F29` | The neck. |
| `Bone.Sternum` | `0x5CBE0CD3` | The sternum (front of the chest). |
| `Bone.Head` | `0xF625B09E` | The head. |
| `Bone.Face` | `0xC8A9BE24` | The face. |
| `Bone.RightToe` | `0x11BA16C9` | The right toes. |
| `Bone.LeftToe` | `0xF41B831F` | The left toes. |
| `Bone.RightFoot` | `0xCF06D4B4` | The right foot. |
| `Bone.LeftFoot` | `0x998F5535` | The left foot. |
| `Bone.RightLegLower` | `0x79FB24DD` | The right lower leg (shin). |
| `Bone.LeftLegLower` | `0x22804AAB` | The left lower leg (shin). |
| `Bone.RightLegUpper` | `0x95D671DB` | The right upper leg (thigh). |
| `Bone.LeftLegUpper` | `0x7DE5F931` | The left upper leg (thigh). |
| `Bone.RightShoulder` | `0x92364388` | The right shoulder. |
| `Bone.LeftShoulder` | `0xB433045C` | The left shoulder. |
| `Bone.RightArmUpper` | `0x16A6973E` | The right upper arm. |
| `Bone.LeftArmUpper` | `0x2166D7EB` | The left upper arm. |
| `Bone.RightArmLower` | `0xFBA1FF35` | The right forearm. |
| `Bone.LeftArmLower` | `0x50676626` | The left forearm. |
| `Bone.RightHand` | `0x624CC24E` | The right hand. |
| `Bone.LeftHand` | `0xDBF07C45` | The left hand. |
| `Bone.RightHandAttach` | `0x52E64FA0` | Where things are held in the right hand (weapons). |
| `Bone.LeftHandAttach` | `0x5A359B5E` | Where things are held in the left hand. |
| `Bone.RightHandAttach2` | `0x6E874912` | A second attach point on the right hand. |
| `Bone.LeftHandAttach2` | `0x2249E6F4` | A second attach point on the left hand. |
| `Bone.RightHandIK` | `0x2C4A76E9` | The right hand's inverse kinematics target. |
| `Bone.LeftHandIK` | `0x875F50E3` | The left hand's inverse kinematics target. |
| `Bone.RightBackAttach` | `0xB5FABBC4` | Attach point on the right of the back (holstered weapons). |
| `Bone.LeftBackAttach` | `0x76161674` | Attach point on the left of the back (holstered weapons). |
| `Bone.RightLegAttach` | `0xD46A3E5E` | Attach point on the right leg (holstered weapons). |
| `Bone.LeftLegAttach` | `0x9154B8F0` | Attach point on the left leg (holstered weapons). |
| `Bone.RightFootIK` | `0xD0180B1A` | The right foot's inverse kinematics target. |
| `Bone.LeftFootIK` | `0xDE30B0A4` | The left foot's inverse kinematics target. |
| `Bone.AimTarget` | `0x33AB1422` | The aim target helper. |
| `Bone.TargetRef1` | `0x013DBFD0` | Targeting reference point 1. |
| `Bone.TargetRef2` | `0x8497EC9D` | Targeting reference point 2. |
| `Bone.CameraRef1` | `0xB03A2552` | Camera reference point 1. |
| `Bone.CameraRef2` | `0x591C2AA2` | Camera reference point 2. |
| `Bone.GrappleAttachHook` | `0xCE85F29D` | Where the grappling hook sits. |
| `Bone.GrappleAttachWire` | `0x50676626` | Where the grapple wire leaves the arm. Same value as `Bone.LeftArmLower`, so it gives the same position. |
| `Bone.GrappleAttachBelt` | `0x58C4C160` | The grapple's belt attach point. Same value as `Bone.Hips`, so it gives the same position. |
| `Bone.GrappleAttachWrist` | `0xDA0E5D79` | The grapple's wrist attach point. |
| `Bone.RightParaAttach` | `0xA65EA5AF` | Right parachute strap attach point. |
| `Bone.LeftParaAttach` | `0x39AC18D0` | Left parachute strap attach point. |
| `Bone.RightParaAttach2` | `0xC1CFBFCC` | Second right parachute strap attach point. |
| `Bone.LeftParaAttach2` | `0x3909E2BE` | Second left parachute strap attach point. |
| `Bone.RightFrontFlap` | `0x2E75FACB` | Right front clothing flap. |
| `Bone.LeftFrontFlap` | `0xD2A2B635` | Left front clothing flap. |
| `Bone.RightBackFlap` | `0x7515F275` | Right back clothing flap. |
| `Bone.LeftBackFlap` | `0x5A9D096F` | Left back clothing flap. |
| `Bone.CollarLeftFlap` | `0xBE59988C` | Left collar flap. |
| `Bone.CollarRightFlap` | `0x53343E2C` | Right collar flap. |
| `Bone.CollarBackFlap` | `0x3D2E5DD6` | Back collar flap. |

**Example**

```lua
-- client: print where the local player's head and hands are
Cmd.Add("bones", function()
	local player = World.LocalPlayer():AsPlayer()

	for _, name in ipairs({ "Head", "RightHand", "LeftHand", "RightFoot" }) do
		local position = player:GetBonePosition(Bone[name]) or vec3(0, 0, 0)
		print(string.format("%s: %.2f %.2f %.2f", name, position.x, position.y, position.z))
	end
end)

-- client: show a screen marker 30 cm above every player's head
Event.Add("OnRender", function()
	for _, client in ipairs(World.GetPlayers()) do
		local player = client:GetPlayer()

		if player then
			local head = player:AsPlayer():GetBonePosition(Bone.Head)
			local screen = head and Camera.WorldToScreen(head + vec3(0, 0.3, 0))

			if screen then
				-- draw something at screen.x, screen.y
			end
		end
	end
end)
```