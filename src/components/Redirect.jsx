import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Redirect({ path }) {
    const navigate = useNavigate();

    useEffect(() => navigate(path), [navigate, path]);
    return null;
}