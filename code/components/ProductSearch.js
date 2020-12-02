import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import fetch from "isomorphic-unfetch";
import { useEffect, useState } from "react";
import constants from "../helpers/constants";
import { useRouter } from "next/router";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
    transition: theme.transitions.create("width"),
    "& [class*='MuiInput-root'] .MuiAutocomplete-input": {
      padding: theme.spacing(1),
    },
  },
  inputRoot: {
    color: "inherit",
    padding: 0,
  },
}));

const ProductSearch = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    if (selected) {
      setSelected(null);
      router.push({
        pathname: "/product/[id]",
        query: { id: selected.productId },
      });
    }
  }, [selected]);

  useEffect(() => {
    if (open) {
      console.log("fetching");
      let active = true;

      (async () => {
        setLoading(true);
        const response = await fetch(`/api/products?name=${query}&limit=5`);
        const products = await response.json();
        if (!products) {
          return undefined;
        }
        if (active) {
          setOptions(products);
        }
        setLoading(false);
      })();

      return () => {
        active = false;
      };
    } else {
      setOptions([]);
    }
  }, [query, open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      classes={{
        root: classes.root,
        inputRoot: classes.inputRoot,
        input: classes.input,
      }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      autoComplete
      inputValue={query}
      onInputChange={(event, newValue) => {
        setQuery(newValue);
      }}
      value={selected}
      onChange={(e, val) => {
        setSelected(val);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name || ""}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search Products..."
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
            startAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default ProductSearch;
